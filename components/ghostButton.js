const GhostButton = ({ label, onPress }) => {
    return <div className="flex space-x-2 justify-center" onClick={onPress}>
        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5 font-medium leading-tight rounded hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-500 active:scale-95 active:shadow-lg transition duration-150 ease-in-out"
        >
            {label}</button>
    </div>
}

export default GhostButton