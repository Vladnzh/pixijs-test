import { replace } from 'lodash';
import randomColor from "randomcolor";

export const generateRandomColor = () => replace(randomColor({ format: 'hex' }), '#', '0x');
