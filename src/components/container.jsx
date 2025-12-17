const Container = ({children, className}) => {
return (
    <div className={`${className} max-w-[1300px] mx-auto px-4 md:px-0 lg:px-0`}>
        {children}
    </div>
)
}

export default Container;