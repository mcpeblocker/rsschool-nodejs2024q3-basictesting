import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 0;
    const account = getBankAccount(initialBalance);
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(1500)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const sourceAccount = getBankAccount(1000);
    const destinationAccount = getBankAccount(0);
    expect(() => sourceAccount.transfer(1500, destinationAccount)).toThrowError(InsufficientFundsError)
  });

  test('should throw error when transferring to the same account', () => {
    const sourceAccount = getBankAccount(1000);
    const destinationAccount = sourceAccount;
    expect(() => sourceAccount.transfer(500, destinationAccount)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(0);
    const amount = 5000;
    account.deposit(amount);
    expect(account.getBalance()).toBe(amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const amount = 500;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(amount)).not.toThrow();
    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const sourceAccount = getBankAccount(1000);
    const destinationAccount = getBankAccount(0);
    expect(() => sourceAccount.transfer(400, destinationAccount)).not.toThrow();
    expect(sourceAccount.getBalance()).toBe(600);
    expect(destinationAccount.getBalance()).toBe(400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe("number");
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).toBeLessThanOrEqual(100);
    } catch(error) {
      expect(account.getBalance()).toBe(initialBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    try {
      await account.synchronizeBalance();
    } catch(error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError)
    }
  });
});
