fn main() {
    let message = "Hello world";
    let message_2 = print_welcome(message);
    println!("{message_2}");
}

fn print_welcome(text: &str) -> &str {
    println!("{text}");
    return "Hi there, world"
}
