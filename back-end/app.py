import os
from flask import Flask
from flask_migrate import Migrate
from models.user import db, User
from routes.auth import auth
from flask_cors import CORS

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, "instance", "transport.db")

os.makedirs(os.path.join(basedir, "instance"), exist_ok=True)

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
app.register_blueprint(auth, url_prefix="/api")

if __name__ == "__main__":
    # Create the database and tables if they don't exist
    with app.app_context():
        db.create_all()
    app.run(port=8000, debug=True)
    