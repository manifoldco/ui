export default function fromJSON(json: object) {
  return JSON.parse(JSON.stringify(json));
}
