const AdminHeader = ({ setIsAdding }: any) => {
    return (
        <header>
            <h1 className="p-[1rem] ml-[auto] mr-[auto]">Admin Events Editor</h1>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button className="m-[1em]" onClick={() => setIsAdding(true)}>Add Event</button>
            </div>
        </header>
    )
}
export default AdminHeader;