import cv2
import dlib
import numpy as np
import time
import requests

def trigger_expression(expression):
    try:
        requests.post("http://localhost:8000/trigger-expression", json={"expression": expression})
        print(f"Sent expression '{expression}' to MCP server.")
    except Exception as e:
        print(f"Failed to send expression: {e}")

def eye_aspect_ratio(eye):
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])
    C = np.linalg.norm(eye[0] - eye[3])
    return (A + B) / (2.0 * C)

def eyebrow_raise_amount(landmarks):
    left_brow = landmarks[21]
    left_eye_top = landmarks[37]
    right_brow = landmarks[22]
    right_eye_top = landmarks[44]

    left_gap = left_eye_top[1] - left_brow[1]
    right_gap = right_eye_top[1] - right_brow[1]

    return (left_gap + right_gap) / 2.0

def calibrate_baselines(detector, predictor, cap, calibration_time=1.5):
    print("Calibrating... Please keep a neutral face and look at the camera.")
    start_time = time.time()

    eyebrow_gaps = []
    left_ears = []
    right_ears = []

    while time.time() - start_time < calibration_time:
        ret, frame = cap.read()
        if not ret:
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            shape = predictor(gray, face)
            landmarks = np.array([[p.x, p.y] for p in shape.parts()])

            eyebrow_gaps.append(eyebrow_raise_amount(landmarks))

            left_eye = landmarks[36:42]
            right_eye = landmarks[42:48]
            left_ears.append(eye_aspect_ratio(left_eye))
            right_ears.append(eye_aspect_ratio(right_eye))

        cv2.putText(frame, "Calibrating... Please keep neutral expression", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
        cv2.imshow("Calibration", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cv2.destroyWindow("Calibration")

    if len(eyebrow_gaps) == 0 or len(left_ears) == 0 or len(right_ears) == 0:
        raise RuntimeError("Calibration failed: no face detected.")

    baseline_eyebrow = np.mean(eyebrow_gaps)
    baseline_left_ear = np.mean(left_ears)
    baseline_right_ear = np.mean(right_ears)

    print(f"Calibration complete.")
    print(f"Baseline eyebrow gap: {baseline_eyebrow:.3f}")
    print(f"Baseline left EAR: {baseline_left_ear:.3f}")
    print(f"Baseline right EAR: {baseline_right_ear:.3f}")

    return baseline_eyebrow, baseline_left_ear, baseline_right_ear

def main():
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

    cap = cv2.VideoCapture(0)

    # Calibration period and counters
    TRIGGER_FRAMES = 30  # ~1.5 seconds at ~20 FPS

    # Auto-calibrate baselines
    baseline_eyebrow, baseline_left_ear, baseline_right_ear = calibrate_baselines(detector, predictor, cap)

    # Threshold multipliers for gesture detection
    EYEBROW_RAISE_MULTIPLIER = 1.3  # 30% higher than baseline
    EYE_CLOSED_MULTIPLIER = 0.8     # 20% lower than baseline for closed eye
    EYE_OPEN_MULTIPLIER = 1.1       # 10% higher than baseline for wide open eye

    # Counters for gestures
    eyebrow_count = 0
    wink_count = 0
    youtube_count = 0

    print("Starting gesture detection. Press 'q' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            shape = predictor(gray, face)
            landmarks = np.array([[p.x, p.y] for p in shape.parts()])

            brow_raise = eyebrow_raise_amount(landmarks)
            left_eye = landmarks[36:42]
            right_eye = landmarks[42:48]
            left_ear = eye_aspect_ratio(left_eye)
            right_ear = eye_aspect_ratio(right_eye)

            # Draw landmarks (for feedback)
            for (x, y) in np.concatenate((left_eye, right_eye, [landmarks[21], landmarks[22], landmarks[37], landmarks[44]])):
                cv2.circle(frame, (x, y), 2, (255, 255, 0), -1)

            # Show debug info
            cv2.putText(frame, f"Eyebrow gap: {brow_raise:.2f}", (10, 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            cv2.putText(frame, f"Left EAR: {left_ear:.2f}", (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            cv2.putText(frame, f"Right EAR: {right_ear:.2f}", (10, 80),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

            # Define thresholds based on baseline
            eyebrow_threshold = baseline_eyebrow * EYEBROW_RAISE_MULTIPLIER
            eye_closed_threshold = baseline_right_ear * EYE_CLOSED_MULTIPLIER
            eye_open_threshold = baseline_left_ear * EYE_OPEN_MULTIPLIER

            # Detect eyebrow raise gesture (Instagram)
            if brow_raise > eyebrow_threshold:
                eyebrow_count += 1
                if eyebrow_count >= TRIGGER_FRAMES:
                    trigger_expression("eyebrow_raise")
                    cap.release()
                    cv2.destroyAllWindows()
                    return
            else:
                eyebrow_count = 0

            # Detect right eye wink (Facebook)
            if right_ear < eye_closed_threshold and left_ear > baseline_left_ear:
                wink_count += 1
                if wink_count >= TRIGGER_FRAMES:
                    trigger_expression("wink")
                    cap.release()
                    cv2.destroyAllWindows()
                    return
            else:
                wink_count = 0

            # Detect right wink + left eye wide open (YouTube)
            if right_ear < eye_closed_threshold and left_ear > eye_open_threshold:
                youtube_count += 1
                if youtube_count >= TRIGGER_FRAMES:
                    trigger_expression("wide_wink")
                    cap.release()
                    cv2.destroyAllWindows()
                    return
            else:
                youtube_count = 0

        cv2.imshow("Gesture Control", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
