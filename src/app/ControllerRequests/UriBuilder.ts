interface NameValue {
  name: string;
  value: string;
}

export class UriBuilder {
  prefix: string;
  uriParameters: NameValue[];
  constructor() {
    this.uriParameters = [];
    this.prefix = "";
  }

  addPrefix(prefix: string) {}
  addParameter(name: string, value: string) {
    this.uriParameters.push({ name: name, value: value });
  }

  buildUriString() {
    let str = `${this.prefix}?`;

    if (this.uriParameters.length > 0) {
      for (let i = 0; i < this.uriParameters.length; i++) {
        const { name, value } = this.uriParameters[i];

        str += `${name}=${value}`;

        if (i != this.uriParameters.length - 1) {
          str += "&";
        }
      }
    }

    return str;
  }
}
