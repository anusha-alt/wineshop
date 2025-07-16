import { http, HttpResponse } from "msw";
import { wines } from "../array";
export const handlers = [
  http.get("/api/wines", ({ request }) => {
    console.log(request)
    const url = new URL(request.url);
    const currentPage = Number(url.searchParams.get('page'));
    const filterType = url.searchParams.get('filterType');
    const cardsPerPage = 4;

    const startIndex = currentPage * cardsPerPage;

    let winesToDisplay = JSON.parse(JSON.stringify(wines));
    //if a particular wine type is selected, winesToDisplay filters its value if its type is the same as the selected one
    if (filterType) {
      winesToDisplay = winesToDisplay.filter((e) => e.type === filterType)
    }

    const winesPageWise = winesToDisplay.slice(startIndex, startIndex + cardsPerPage);
    const pageCount = Math.ceil(winesToDisplay.length / cardsPerPage);
    return HttpResponse.json({
      items: winesPageWise,
      pagination: {
        pageSize: cardsPerPage,
        currentPage,
        totalNumberOfResults: winesToDisplay.length,
        numberOfPages: pageCount
      },
    });
  }),
];
