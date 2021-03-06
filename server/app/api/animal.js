import { Router } from 'express';
import { postRes, patchRes } from '../utils/utils';
import { saveAnimal, addLikeToPet } from '../../../db/pets/pet';

const animal = Router();

animal.route('/').post(postRes(saveAnimal));

animal.patch('/addlike', patchRes(addLikeToPet));

export default animal;
