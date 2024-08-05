const AdminHeader = ({ setIsAdding }: any) => {
    return (
        <header>
            <h1 className="p-[1rem] ml-[auto] mr-[auto]">Admin Events Viewer</h1>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button className="m-[1em] bg-primary hover:bg-blueButtonHover" onClick={() => setIsAdding(true)}>Add Event</button>
            </div>
        </header>
    )
}
export default AdminHeader;