import PetLikes, { truncate } from './index';
import Pet from '../pets/index';

const getTopPetsOfTheDay = async () => {
  const topPets = await PetLikes.forge()
    .orderBy('-likes')
    .fetchAll({ limit: 5 });
  const data = await Promise.all(topPets.toJSON().map(topPet => Pet.where({ id: topPet.petId }).fetch()));
  return {
    toJSON() {
      return this.data.map(pet => pet.toJSON());
    },
    data,
  };
};

const addLikeForTodayToPetById = async petId => {
  const petLikes = await PetLikes.where({ petId }).fetch();
  if (petLikes) {
    await petLikes.set('likes', petLikes.attributes.likes + 1).save();
  } else {
    await PetLikes.forge({ petId }).save();
  }
};

export { getTopPetsOfTheDay, addLikeForTodayToPetById, truncate as reset };
