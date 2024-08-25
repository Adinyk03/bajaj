from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'POST':
        data = request.json.get('data', [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_lowercase = [max([char for char in alphabets if char.islower()])] if any(char.islower() for char in alphabets) else []

        response = {
            "1.is_success": True,
            "2.user_id": "Aditya_Nayak_27092003",
            "3.email": "aditya.nayak2021@vitstudent.ac.in",
            "4.roll_number": "21BCE0540",
            "5.numbers": numbers,
            "6.alphabets": alphabets,
            "7.highest_lowercase_alphabet": highest_lowercase
        }

        return jsonify(response), 200

    if request.method == 'GET':
        return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
