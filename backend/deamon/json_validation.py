from jsonschema import validate

class Validator():
    @staticmethod
    def json_validation(data_dict:dict) -> None:
        pattern = {"type": "object", "minProperties": 2,
        "maxProperties": 2, "properties": {"version": {"type": "string"},
        "data": {"type": "array", "minItems": 9, "maxItems": 9, "prefixItems": [{"type": "string"}, {"type": "boolean"}, {"type": "boolean"}, {"type": "boolean"},
        {"type": "boolean"}, {"type": "boolean"}, {"type": "number"}, {"type": "number"}, {"type": "number"}]}}, "required": ["version"]}
        validate(instance=data_dict, schema=pattern)
