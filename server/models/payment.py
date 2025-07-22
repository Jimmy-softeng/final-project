from server.extensions import db
from sqlalchemy_serializer import SerializerMixin

class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)  # e.g., "M-Pesa", "Card", "Cash"
    reference = db.Column(db.String(100), unique=True)  # e.g., M-Pesa code or transaction ID
    status = db.Column(db.String(50), default="pending")  # pending, completed, failed, etc.
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    # Foreign key to the User who made the payment
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # relationship mapping
    user = db.relationship('User', back_populates='payments')

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "payment_method": self.payment_method,
            "reference": self.reference,
            "status": self.status,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
            # Optional: include user info
            #"user_id": self.user_id,
            
            "user_name": self.user.username if self.user else None
        }

    def __repr__(self):
        return f"<Payment {self.reference} - {self.amount} by User {self.user_id}>"