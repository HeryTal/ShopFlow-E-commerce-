const authSeller = async (userId) => {
    try {
        return Boolean(userId);
    } catch (error) {
        console.error('authSeller error:', error.message);
        return false;
    }
}

export default authSeller;
