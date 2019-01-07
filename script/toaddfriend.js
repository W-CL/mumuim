/**
 *初始化db
 * @param db
 */
function openDb(db) {
    db.openDatabase({
        name: "mylocaldb"
    }, function(ret, err){
        if( ret.status ){
           return true;
        }else{
          return false
        }
    });
}

/**
 * 删除表格
 * @param db
 * @param table
 */

function deltable(db,table) {
    db.executeSql({
        name: "mylocaldb",
        sql: 'drop table '+table
    }, function(ret, err) {
        if (ret.status) {
            console.log("ret:"+JSON.stringify(ret))
        } else {
            console.log("droperr"+JSON.stringify(err))
        }
    });
}

/**
 * 创建一个表格
 * @param db
 */
function newToAddFriend(db) {
      db.executeSql({
          name: "mylocaldb",
          sql: 'CREATE TABLE IF NOT EXISTS ToAddFriend(nickname varchar(25), username varchar(25), uid INTEGER, intro varchar(255),photo varchar(255),online INTEGER,isfriend INTEGER)'
      }, function(ret, err) {
          if (ret.status) {
              console.log("ret:"+JSON.stringify(ret))
          } else {
              console.log("createerr"+JSON.stringify(err))
          }
      });


}

/**
 * 添加一条信息
 * @param db
 * @param data
 */
function insertToAddFriend(db,data) {
    newToAddFriend(db)
    db.executeSql({
        name: 'mylocaldb',
        sql: 'INSERT INTO toAddFriend  VALUES ( "'+data.nickname+'", "'+data.username+'", '+data.uid+', "'+data.intro+'", "'+data.photo+'", '+data.online+', '+data.isfriend+')'
    }, function(ret, err){
        if( ret.status ){
            console.log('添加成功');
        }else{
            console.log("inserterr" + JSON.stringify( err ) );
        }
    });
}

/**
 * 根据uid 查询一条信息
 * @param db
 * @param uid
 */
function findToAddFriendByUid(db,uid) {
    db.selectSql({
        name: 'mylocaldb',
        sql: 'SELECT * FROM toAddFriend where uid='+uid
    }, function(ret, err){
        if( ret.status ){
           return ret.data
        }else {
            console.log("selecterr" + JSON.stringify( err ) );
        }
    });
}

/**
 *根据昵称获取用户信息
 * @param db
 * @param nickname
 */
function findToAddFriendByNickName(db,nickname) {
    db.selectSql({
        name: 'mylocaldb',
        sql: 'SELECT * FROM toAddFriend where nickname="'+nickname+'"'
    }, function(ret, err){
        if( ret.status ){
            return ret.data
        }else {
            console.log("selecterr" + JSON.stringify( err ) );
        }
    });
}


/**
 * 根据uid 修改信息
 * @param db
 * @param data
 */

function updateToAddFriendByUid(db,data) {
    var where = '';
    if(data.nickname){
        where += ' nickname="'+data.nickname+'"'
    }
    if(data.username){
        if(where){
            where +=', username="'+data.username+'"'
        }else{
            where +=' username="'+data.username+'"'
        }

    }
    if(data.intro){
        if(where){
            where +=', intro="'+data.intro+'"'
        }else{
            where +=' intro="'+data.intro+'"'
        }
    }
    if(data.photo){
        if(where){
            where +=', photo="'+data.photo+'"'
        }else{
            where +=' photo="'+data.photo+'"'
        }
    }
    if(data.online){
        if(where){
            where +=', online="'+data.online+'"'
        }else{
            where +=' online="'+data.online+'"'
        }
    }
    if(data.isfriend){
        if(where){
            where +=', isfriend="'+data.isfriend+'"'
        }else{
            where +=' isfriend="'+data.isfriend+'"'
        }
    }
    where += ' where uid='+data.uid
        db.executeSql({
        name: 'mylocaldb',
        sql: 'UPDATE  toAddFriend SET  '+where
    }, function(ret, err){
        if( ret.status ){
            console.log('修改成功');
        }else{
            console.log("inserterr" + JSON.stringify( err ) );
        }
    });

}

/**
 * 获取所有的信息
 * @param db
 */
function getAllToAddFriend(db) {
    newToAddFriend(db)
    db.selectSql({
        name: 'mylocaldb',
        sql: 'SELECT * FROM toAddFriend'
    }, function(ret, err){
        if( ret.status ){
            console.log("selectall" + JSON.stringify( ret.data ) );
            return ret.data
        }else {
            console.log("selecterr" + JSON.stringify( err ) );
        }
    });
}

/**
 * 关闭数据库
 */

function closedb() {
    db.closeDatabase({
        name: 'mylocaldb'
    }, function(ret, err){
        if( ret.status ){
            alert('关闭成功');
        }else{
            alert( JSON.stringify( err ) );
        }
    });
}