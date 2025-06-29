# clients/client_functions.py

import webbrowser

def open_instagram():
    print("✅ Trigger: Instagram")
    webbrowser.open('https://www.instagram.com')

def open_facebook():
    print("✅ Trigger: Facebook")
    webbrowser.open('https://www.facebook.com')

def open_youtube():
    print("✅ Trigger: YouTube")
    webbrowser.open('https://www.youtube.com')

# Just map one "client" to its main entry point
client_functions = {
    "open_instagram": open_instagram,
    "open_facebook": open_facebook,
    "open_youtube": open_youtube,
    # Add more as needed
}
