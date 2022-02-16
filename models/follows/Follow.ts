/**
 * @file Encapsulates the data type representing relationship between two users,
 * as in a User follows another User
 */
import User from '../users/User';

/**
 * @typedef Follow Represents follows relationship between two users,
 * as in a user follows another user
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User following the other User
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
}