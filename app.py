from flask import Flask, render_template, send_from_directory
from data import portfolio_data

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', data=portfolio_data)

@app.route('/cert/<filename>')
def serve_cert(filename):
    return send_from_directory(r'C:\Users\ashut\.gemini\antigravity\brain\2937f12f-4aa2-4da5-a86c-134847518efa', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
