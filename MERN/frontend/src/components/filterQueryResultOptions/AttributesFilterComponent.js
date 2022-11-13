import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
      {[{ Color: ["red", "blue", "green"] }, { Capacity: ["100L", "200L"] }].map(
        (item, idx) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{Object.keys(item)}</b>
            </Form.Label>
            {item[Object.keys(item)].map((i, idx) => (
              <Form.Check key={idx} type="checkbox" label={i} />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default AttributesFilterComponent;
