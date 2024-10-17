export const removeUndefinedFields = (obj: object) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null)
    );
};
  