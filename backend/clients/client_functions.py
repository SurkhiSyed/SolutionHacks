# clients/client_functions.py

from facial_opencv import test2

# Just map one "client" to its main entry point
client_functions = {
    "gesture_control": test2.main  # will run the full gesture loop
}
