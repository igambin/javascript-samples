// Implement interfaces representing the result of the Pokeapi.
interface IPokemonDetail {
    url: string;
    name: string;
}

interface IPokemonResult {
    previous: string;
    results: IPokemonDetail[];
    next: string;
}

// Create PokemonService class
class PokemonService {
    // Some static variables
    private static url = 'http://pokeapi.co/api/v2/pokemon/?limit=';
    private static pageSize = 5;

    public currentPage = 1;

    loadPokemons(callback: (result: IPokemonResult) => void) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            let jsonResult = <IPokemonResult>JSON.parse(xhr.response);
            callback(jsonResult);
        });

        let url = PokemonService.url + PokemonService.pageSize;
        if (this.currentPage > 1) {
            url += "&offset=" + (this.currentPage - 1) * PokemonService.pageSize;
        }

        xhr.open('GET', url);
        xhr.send();
    };
}

export default PokemonService;