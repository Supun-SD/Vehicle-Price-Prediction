from pydantic import BaseModel

class VehicleInput(BaseModel):
    brand: str
    model: str
    year: int
    condition: str
    transmission: str
    body_type: str
    fuel_type: str
    engine_capacity: int
    mileage: int
