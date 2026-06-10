from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import json, os, time

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-cdw-portal-secret-key')
DATA_FILE = os.path.join(os.path.dirname(__file__), 'Data', 'data.json')


PUBLIC_NAV = [
    {'key': 'home', 'label': 'Home', 'icon': '🏠', 'href': '/main'},
    {'key': 'lookup', 'label': 'Child Status Lookup', 'icon': '🔍', 'href': '/lookup'},
    {'key': 'announcements', 'label': 'Announcements', 'icon': '📢', 'href': '/announcements'},
]

ADMIN_NAV = [
    {'key': 'dashboard', 'label': 'Dashboard', 'icon': '📊', 'href': '/admin/dashboard'},
    {'key': 'children', 'label': 'Children Database', 'icon': '👶', 'href': '/admin/children'},
    {'key': 'parents', 'label': 'Parent Database', 'icon': '👨‍👩‍👧', 'href': '/admin/parents'},
    {'key': 'clearance', 'label': 'Enrollment Clearance', 'icon': '✅', 'href': '/admin/clearance'},
    {'key': 'feeding', 'label': 'Feeding Program', 'icon': '🍱', 'href': '/admin/feeding'},
    {'key': 'assessment', 'label': 'Nutritional Assessment', 'icon': '📋', 'href': '/admin/assessment'},
    {'key': 'announce_admin', 'label': 'Announcements Manager', 'icon': '📣', 'href': '/admin/announce'},
]

PAGES = {
    'home': {'title': 'Home', 'icon': '🏠', 'access': 'Public'},
    'lookup': {'title': 'Child Status Lookup', 'icon': '🔍', 'access': 'Public'},
    'announcements': {'title': 'Announcements', 'icon': '📢', 'access': 'Public'},
    'dashboard': {'title': 'Dashboard', 'icon': '📊', 'access': 'Admin-only'},
    'children': {'title': 'Children Database', 'icon': '👶', 'access': 'Admin-only'},
    'parents': {'title': 'Parent Database', 'icon': '👨‍👩‍👧', 'access': 'Admin-only'},
    'clearance': {'title': 'Enrollment Clearance', 'icon': '✅', 'access': 'Admin-only'},
    'feeding': {'title': 'Feeding Program', 'icon': '🍱', 'access': 'Admin-only'},
    'announce_admin': {'title': 'Announcements Manager', 'icon': '📣', 'access': 'Admin-only'},
    'login': {'title': 'Admin Login', 'icon': '🔐', 'access': 'Public'},
}

ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'cdw2025'  # Temporary hardcoded credential; replace with database-backed auth later.


def is_admin_logged_in():
    return session.get('admin') is True


def render_shell(page_key, view_type='placeholder', error=None):
    return render_template(
        'main.html',
        page=PAGES[page_key],
        active_page=page_key,
        view_type=view_type,
        public_nav=PUBLIC_NAV,
        admin_nav=ADMIN_NAV,
        is_admin=is_admin_logged_in(),
        error=error,
    )


def require_admin():
    if not is_admin_logged_in():
        return redirect(url_for('admin_login'))
    return None

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
    return render_shell('home', view_type='home')

@app.route('/lookup')
def lookup():
    return render_shell('lookup')

@app.route('/announcements')
def announcements():
    return render_shell('announcements')

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if is_admin_logged_in():
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['admin'] = True
            return redirect(url_for('admin_dashboard'))
        return render_shell('login', view_type='login', error='Invalid username or password.')

    return render_shell('login', view_type='login')

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    return redirect(url_for('main_home'))

@app.route('/admin/dashboard')
def admin_dashboard():
    guard = require_admin()
    if guard:
        return guard
    return render_shell('dashboard')

@app.route('/admin/children')
def admin_children():
    guard = require_admin()
    if guard:
        return guard
    return render_shell('children')

@app.route('/admin/parents')
def admin_parents():
    guard = require_admin()
    if guard:
        return guard
    return render_shell('parents')

@app.route('/admin/clearance')
def admin_clearance():
    guard = require_admin()
    if guard:
        return guard
    return render_shell('clearance')

@app.route('/admin/feeding')
def admin_feeding():
    guard = require_admin()
    if guard:
        return guard
    return render_shell('feeding')

@app.route('/admin/assessment')
def admin_assessment():
    guard = require_admin()
    if guard:
        return guard
    return redirect(url_for('index'))

@app.route('/admin/announce')
def admin_announce():
    guard = require_admin()
    if guard:
        return guard
    return render_shell('announce_admin')

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
