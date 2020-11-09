// import JSEncrypt from './jsencrypt'
import { JSEncrypt } from 'jsencrypt'


const encrypt = new JSEncrypt();
const RsaPubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9TBx+imgGVFqtEH6H5/exWHKadViqNUfWaVLL2EBBlG1Q1X2PgGzv6YZ5HCrNhB5oLkWuJ+pdlHPMtKZwfqSonTZFQvkyg5f8OiyRz2YZTL+MKmijbkFVzANQPw93xTfcnNfGHq21c/78NC7wTeenP1edqO/k24UK4olwY47elwIDAQAB';
//加密
export default {
    encrypt(value, pubKey = RsaPubKey) {
        // Encrypt with the public key...
        encrypt.setPublicKey(pubKey);
        return encrypt.encrypt(value);
    },
    decrypt(value, privKey = '') {
        // Decrypt with the private key...
        encrypt.setPrivateKey(privKey);
        return encrypt.decrypt(value);
    }
}