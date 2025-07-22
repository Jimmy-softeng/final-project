from server.extensions import db
from sqlalchemy_serializer import SerializerMixin

class ProductWriteoff(db.Model, SerializerMixin):
    __tablename__ = 'product_writeoffs'
    
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    reason = db.Column(db.Text)
    expiry_date = db.Column(db.DateTime)
    buying_price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    product_id=db.Column(db.Integer,db.ForeignKey('products.id'), nullable=False)
    
    #one to many relationship
    product=db.relationship('Product',back_populates='product_writeoffs')
    
    def to_dict(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "reason": self.reason,
            "expiry_date": self.expiry_date.isoformat() if self.expiry_date else None,
            "buying_price": self.buying_price,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            # Optional: Include product id
            #"product_id": self.product_id,
            "product_name": self.product.name if self.product else None
        }
    
    def __repr__(self):
        return (
            f"<WriteOff {self.quantity} units of Product {self.product_id} "
            f"due to '{self.reason}'>"
        )

