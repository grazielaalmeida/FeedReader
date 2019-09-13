
// To make sure that the tests don't run until the DOM is ready.
$(function () {

	describe('RSS Feeds', function () {

		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// Write a test that loops through each feed in the allFeeds and make sure it has a URL defined and not empty.

		it('have a defined URL and the URL is not empty', function () {
			for (let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).toBeGreaterThan(0);
			}
		});

		// Write a test that loops through each feed in allFeeds and make sure it has a name defined and is not empty.

		it('have a defined name and the name is not empty', function () {
			for (let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).toBeGreaterThan(0);
			}
		});
	});


	// Write a new test suite named "The menu".
	describe('The menu', function () {
		const menu = document.querySelector('body');

		// Write a test that ensures the menu element is hidden by default.
		it('is hidden by default', function () {
			expect(menu.classList).toContain("menu-hidden");
		});

		// Write a test that ensures the menu changes visibility when the menu icon is clicked.
		it('shows when the menu icon is clicked', function () {
			menu.classList.toggle('menu-hidden');
			expect(menu.classList.contains('menu-hidden')).toBe(false);
		});

		it('hides when the menu icon is clicked again', function () {
			menu.classList.toggle('menu-hidden');
			expect(menu.classList.contains('menu-hidden')).toBe(true);
		});
	});
	// Write a new test suite named "Initial Entries"
	describe('Initial Entries', function () {

		// Before loading the feed
		beforeEach(function (done) {
			loadFeed(0, done);
		});
		it('have at least one entry element in the feed container', function () {
			const entry = document.querySelectorAll('.feed .entry');
			expect(entry.length).toBeGreaterThan(0);
		});
	});
	//  Write a new test suite named "New Feed Selection"
	describe('New Feed Selection', function () {
		let initialFeed;
		// Write a test that ensures when a new feed is loaded by the loadFeed function.

		beforeEach(function (done) {
			loadFeed(0, function () {
				initialFeed = document.querySelector('.feed').textContent;
				loadFeed(1, done);
			});
		});
		it('content changes when feed reloads', function (done) {
			const newFeed = document.querySelector(".feed").textContent;
			expect(initialFeed).not.toEqual(newFeed);
			done();
		});
	});
}());
