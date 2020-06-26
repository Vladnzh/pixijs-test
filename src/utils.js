import { replace } from 'lodash';
import * as randomColor from 'randomcolor';

export const generateRandomColor = () => replace(randomColor({ format: 'hex' }), '#', '0x');
