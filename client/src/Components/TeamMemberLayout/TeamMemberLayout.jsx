const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, role } = useSelector((state) => state.auth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [visibleSections, setVisibleSections] = useState({});

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSection = (section) => {
        setVisibleSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("authToken");
        navigate("/");
        toast.info("You have logged out successfully.");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#151845" }}>
            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                visibleSections={visibleSections}
                toggleSection={toggleSection}
                handleLogout={handleLogout}
            />

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );