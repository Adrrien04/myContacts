import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try  {
        return await bcrypt.hash(password, 10);
    } catch(err) {
        console.log(err)
    }
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}