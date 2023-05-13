import { ApiContants } from "../constants";

//https://www.countryflagicons.com/FLAT/64/IN.png
const getFlagIcon = (
    code = 'BR', 
    style = ApiContants.COUNTRY_FLAG.STYLE.FLAT,
    size = ApiContants.COUNTRY_FLAG.SIZE[64] 
    ) => `${ApiContants.COUNTRY_FLAG.BASE_URL}/${style}/${size}/${code}.png`;

export default {getFlagIcon};