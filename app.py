from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json, os, time
from functools import wraps

app = Flask(__name__)
app.secret_key = 'cdw-nmscst-2025'  # temporary, move to env var later
DATA_FILE = os.path.join(os.path.dirname(__file__), 'Data', 'data.json')

ADMIN_USER = 'admin'
ADMIN_PASS = 'cdw2025'


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('is_admin'):
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated


def render_main(page, is_admin=None, login_error=''):
    return render_template(
        'main.html',
        page=page,
        is_admin=session.get('is_admin', False) if is_admin is None else is_admin,
        login_error=login_error,
    )


def load_data():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)
    with open(DATA_FILE, 'r') as f:
        return json.load(f)


def save_data(records):
    with open(DATA_FILE, 'w') as f:
        json.dump(records, f, indent=2)


@app.route('/main')
def main_home():
    return render_main('home')


@app.route('/lookup')
def lookup():
    return render_main('lookup')


@app.route('/announcements')
def announcements():
    return render_main('announcements')


@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    return render_main('dashboard', is_admin=True)


@app.route('/admin/children')
@admin_required
def admin_children():
    return render_main('children', is_admin=True)


@app.route('/admin/parents')
@admin_required
def admin_parents():
    return render_main('parents', is_admin=True)


@app.route('/admin/clearance')
@admin_required
def admin_clearance():
    return render_main('clearance', is_admin=True)


@app.route('/admin/feeding')
@admin_required
def admin_feeding():
    return render_main('feeding', is_admin=True)


@app.route('/admin/assessment')
@admin_required
def admin_assessment():
    return redirect(url_for('index'))


@app.route('/admin/announce')
@admin_required
def admin_announce():
    return render_main('announce', is_admin=True)


@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'GET' and session.get('is_admin'):
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == ADMIN_USER and password == ADMIN_PASS:
            session['is_admin'] = True
            return redirect(url_for('admin_dashboard'))
        return render_main('login', is_admin=False, login_error='Invalid credentials')

    return render_main('login', is_admin=False)


@app.route('/admin/logout')
def admin_logout():
    session.pop('is_admin', None)
    return redirect(url_for('main_home'))


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
