const BorrowRepository = require('../data/borrowRepository');

class BorrowService{
    constructor(db){
        this.borrowRepository = new BorrowRepository(db);
    }

    async getAllBorrows(){
        return await this.borrowRepository.getAllBorrows();
    }

    async getBorrowById(id){
        const borrow = await this.borrowRepository.getBorrowById(id);
        if(!borrow){
            throw new Error('borrow record not found');
        }
        return borrow;
    }

    async createBorrow(data){
        return await this.borrowRepository.createBorrow(data);
    }

    async updateBorrow(id, data){
        const updated = await this.borrowRepository.updateBorrow(id, data);
        if(!updated){
            throw new Error('borrow record not updated');
        }
        return updated;
    }

    async deleteBorrow(id){
        const deleted = await this.borrowRepository.deleteBorrow(id);
        if(!deleted){
            throw new Error('borrow record not deleted');
        }
        return deleted;
    }
}

module.exports = BorrowService;