const SearchBar = ({ setSearchTerm }: { setSearchTerm: (term: string) => void }) => {
    return (
        <>
            <input
                className="w-full px-2 py-1 bg-slate-700 rounded-md"
                type="text"
                placeholder="Search clips by title or author"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </>
    );
}

export default SearchBar;