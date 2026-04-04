// Import UUID for unique IDs
import { v4 as uuidv4 } from 'uuid';
// In-memory array to store users (this will be replaced by a database in a real application)
let users = [];

export const createUsers = (req, res) => {

    const user = req.body;

    users.push({ ...user, id: uuidv4()});

    res.send(`User with the name ${user.firstName} ${user.lastName} added !`)
};
export const getUser = (req, res) => {
    console.log(users);
    res.send(users);
};
export const getUserbyId = (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
        return res.status(404).send('User not found');
    }

    res.send(foundUser);
};
export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with ID ${id} deleted!`);
};
export const updateUser = (req, res) => {
    const { id } = req.params; // we extract the id parameter from the request parameters using destructuring assignment. This gives us access to the id value that was passed in the URL when the request is made.
    
    const { firstName, lastName, age } = req.body; // we extract the updated user data from the request body.

    const user = users.find((user) => user.id === id); // we search for the user in the users array using the find method. We compare the id of each user with the id extracted from the request parameters to find the matching user.

    if(!user) { // if the user is not found (i.e., if the find method returns undefined), we return a 404 status code with a message indicating that the user was not found.
        return res.status(404).send('User not found');
    }
    if(firstName) user.firstName = firstName; // if the firstName field is provided in the request body, we update the user's firstName property with the new value.
    if(lastName) user.lastName = lastName; // if the lastName field is provided in the request body, we update the user's lastName property with the new value.
    if(age) user.age = age; // if the age field is provided in the request body, we update the user's age property with the new value.
    
    res.send(`User with ID ${id} has been updated!`); // Finally, we send a response indicating that the user with the specified ID has been updated.
};
