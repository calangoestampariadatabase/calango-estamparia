const Container = ({children, className}) => {
return (
    <div className={`${className} max-w-[1300px] mx-auto`}>
        {children}
    </div>
)
}

export default Container;