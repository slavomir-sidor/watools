/**
 * Pagination
 * 
 */
Pagination = function(count, page, itemPerPage)
{
	var itemPerPage = typeof itemPerPage !== 'undefined' ? itemPerPage : 10;

	this.itemsTotalCount = parseInt(count);
	this.itemsPerPage = parseInt(itemPerPage);
	this.page = parseInt(page);
	this.pages = Math.ceil(this.itemsTotalCount / this.itemsPerPage);
	this.offset = (this.page - 1) * this.itemsPerPage;
	this.itemsCount = (this.page < this.pages) ? this.itemsPerPage : (this.itemsTotalCount - this.offset);
};

Pagination.prototype.getLimit = function()
{
	return this.itemsPerPage;
}

Pagination.prototype.getOffset = function()
{
	return this.offset;
}

/**
 * Module exports.
 */
module.exports = Pagination;