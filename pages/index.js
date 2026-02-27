/**
 * Central export for all page objects.
 * Usage: const { LoginPage, InventoryPage } = require('../pages');
 */
const BasePage = require('./BasePage');
const LoginPage = require('./LoginPage');
const InventoryPage = require('./InventoryPage');

module.exports = {
  BasePage,
  LoginPage,
  InventoryPage,
};
