from flask import Flask
from flask_migrate import Migrate
from models.user import db
from routes.auth import auth
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///transport.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
app.register_blueprint(auth, url_prefix="/api")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(port=8000, debug=True)
    