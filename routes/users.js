const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { validateProfile, validateAvarar } = require('../utils/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserId);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvarar, updateAvatar);

module.exports = router;
