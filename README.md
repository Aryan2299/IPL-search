Discovery Page for IPL 
Production - https://search-ipl.netlify.app

Page Load Time

Dashboard/Landing page - 1.6 minutes

Takes very long to load application as downloading datasets takes time (huge files). But once loaded, navigating datasets is seamless. Calculated using Networks tab and console.time().

Usage

Clicking the “All” button toggles between all filters and a few of them.

Search and filters have limited functionality. By default, “All” is selected and all filters are selected. This will show data from all datasets, 10 at a time. To select fewer filters, click on “All” again. This deselects a few filters and shows results for only 2 filters (decided beforehand in the code). 

“Next” and “Prep” buttons are rendered once the results are rendered, to navigate the dataset.

**Results can only be seen once the “Search’ button has been clicked. If results for all filters have been rendered, click on “All” again to deselect a few filters and click on “Search” button again to view new results.


Information Hierarchy

Files - src/static/archive
Contains csv and xlsx files converted to json files for better availability to main component. All json files are imported in two objects-

	categoriesAll
	Array of datasets for displaying data from all datasets, i.e. all filters selected, 10 at a time.

	categoriesFixed
	Array of datasets for displaying data from some datasets, i.e. some filters selected beforehand (“Matches” and “Players”) , 10 at a time.


filtersObject 
Array of labels for filter buttons.

Components
	Dashboard
	Point of entry. Uses lifecycles to update props and re-render according to dependency array.

	RenderFilters
	Renders filter buttons. Allows toggling between all filters selections and limited filters selection by clicking on the “All” button.

	NavigateResults
	Memoized - Allows navigation for rendered results and controls re-renders.

	InfoCard
	Displays props in a card.

	ExtractData
	Iterates over props and renders (10) cards accordingly.

Performance 
Memoization has been used in the project to control unnecessary re-renders and limit wasted React cycles. Since multiple large datasets are used, it’s crucial to limit re-renders and prevent unnecessary re-rendering of children by limiting parent’s re-renders. Memoization will help prevent the outlier situation in this case - web application crashing. Only 10 JSON objects are used at a time and useEffect only calls showData() when there’s a change in any of the elements in the dependency array - currentFilter, start, isLastArray. 
