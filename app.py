from flask import Flask, render_template, request, jsonify
import json, os, time

app = Flask(__name__)
DATA_FILE = os.path.join(os.path.dirname(__file__), 'Data', 'data.json')

def load_data():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_data(records):
    with open(DATA_FILE, 'w') as f:
        json.dump(records, f, indent=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/records', methods=['GET'])
def get_records():
    return jsonify(load_data())

@app.route('/api/records', methods=['POST'])
def add_record():
    record = request.get_json()
    if not record:
        return jsonify({'error': 'No data received'}), 400
    records = load_data()
    record['id'] = int(time.time() * 1000)
    records.append(record)
    save_data(records)
    return jsonify(record), 201

@app.route('/api/records/<int:record_id>', methods=['PUT'])
def update_record(record_id):
    updates = request.get_json()
    if not updates:
        return jsonify({'error': 'No data received'}), 400
    records = load_data()
    for r in records:
        if r.get('id') == record_id:
            r.update(updates)
            save_data(records)
            return jsonify(r)
    return jsonify({'error': 'Record not found'}), 404

@app.route('/api/records/<int:record_id>', methods=['DELETE'])
def delete_record(record_id):
    records = load_data()
    records = [r for r in records if r.get('id') != record_id]
    save_data(records)
    return jsonify({'ok': True})

@app.route('/api/records', methods=['DELETE'])
def clear_all():
    save_data([])
    return jsonify({'ok': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
