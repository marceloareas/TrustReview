export const getSearchedProductName = () => {
    return localStorage.getItem('searchTerm') || '';
}