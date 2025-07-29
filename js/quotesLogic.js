async function getQuote() {
  const url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`sdfsfsf Response status: ${response.status}`);
    }

    const json = await response.json();
    const final = JSON.parse(json.contents)
    // console.log(final)
    const finalQuote = final[0]['q'];
    const finalQuoteAuthor = final[0]['a'];
    const result = [finalQuote, finalQuoteAuthor]
    // console.log(result)
    return result;
  } catch (error) {
    console.error(error.message);
    return ["Error fetching quote", "Unknown"]
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const quotes = document.querySelector(".quotes");
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");


  try {
    const result = await getQuote();
    quote.innerHTML = `<i class="fa-solid fa-quote-left"></i> ${result[0]} <i class="fa-solid fa-quote-right"></i>`;
    author.innerHTML = result[1];
    console.log(result)
  } catch (error) {
    console.error("Error updating the message", error.message)
  }
});
