Discovery Page for IPL 
Production - https://search-ipl.netlify.app

Page Load Time

Dashboard/Landing page - 1.6 minutes

Calculated using average values from Networks tab (browser console) and console.time().

Usage

Clicking the “All” button toggles between all filters and a few of them.

Search and filters have limited functionality. By default, “All” is selected and all filters are selected. This will show data from all datasets, 10 at a time. To select fewer filters, click on “All” again. This deselects a few filters and shows results for only 2 filters (decided beforehand in the code). 

“Next” and “Prep” buttons are rendered once the results are rendered, to navigate the dataset.

**Results can only be seen once the “Search’ button has been clicked. Doing so sends a request to either https://ipl-search-server.herokuapp.com/all/index} or https://ipl-search-server.herokuapp.com/random/index. If results for all filters have been rendered, click on “All” again to deselect a few filters and click on “Search” button again to view new results.


Information Hierarchy

filtersObject 
Array of labels for filter buttons.

Components
	Dashboard
	Point of entry. Uses lifecycles to update props and re-render according to dependency array.

	RenderFilters
	Renders filter buttons. Allows toggling between all filters selections and limited filters selection by 	clicking on the “All” button and send request to the backend server.

	NavigateResults
	Memoized - Allows navigation for rendered results and controls re-renders.

	InfoCard
	Displays props in a card.

	ExtractData
	Iterates over props and renders (10) cards accordingly.

Performance 
Memoization has been used in the project to control unnecessary re-renders and limit wasted React cycles. Since multiple large datasets are used, it’s crucial to limit re-renders and prevent unnecessary re-rendering of children by limiting parent’s re-renders. Memoization will help prevent the outlier situation in this case - web application crashing. In addition, pagination has been implemented on backend sever to return only 10 JSON objects at a time and useEffect only calls showData() when there’s a change in any of the elements in the dependency array - start. 
