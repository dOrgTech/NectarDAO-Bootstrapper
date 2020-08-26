import {publicToAddress} from "ethereumjs-util";
import HDKey from "hdkey";

export default class AddressGenerator {
    constructor(data) {
        this.hdk = new HDKey();
        this.hdk.publicKey = new Buffer(data.publicKey, "hex");
        this.hdk.chainCode = new Buffer(data.chainCode, "hex");
    }

    getAddressString = index => {
        let derivedKey = this.hdk.derive(`m/${index}`);
        let address = publicToAddress(derivedKey.publicKey, true);
        return "0x" + address.toString("hex");
    }
}
