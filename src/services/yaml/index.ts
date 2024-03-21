const yaml = require('js-yaml');

export default async function yamlToJSON(yamlString: string): Promise<object> {
  return new Promise((resolve, reject) => {
    try {
      if (!yamlString) {
        resolve({});
      } else {
        const jsonData = yaml.load(yamlString);
        resolve(jsonData);
      }
    } catch (error) {
      reject(error);
    }
  });
}
