

/**
 * 创建一个房间
 * id  int  房间的id
 * roomType  int  房间类型，1两人之间的聊天，2群聊
 * content  string  聊天文字
 * video  string  聊天视频
 * photo string  聊天图片
 * yuyin string  聊天语音
 * biaoqing string  聊天表情
 * createTime int 创建时间
 * massegeStatus int 是否被查看 :1否，2是
 * @param db
 */
function newTalkingMessage(db) {
      db.executeSql({
          name: "mylocaldb",
          sql: 'CREATE TABLE IF NOT EXISTS talkingMessage(id INTEGER,uid INTEGER,roomType INTEGER, content nvarchar(255),video varchar(255),photo varchar(255),yuyin varchar(255),biaoqing varchar(255),createTime INTEGER,massegeStatus INTEGER)'
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
 * id int 房间id(接收信息人的id)
 * uid  int 发送人的id
 * roomType int 房间类型
 * content string 聊天文字
 * video  string  聊天视频
 * photo string  聊天图片
 * yuyin string  聊天语音
 * biaoqing string  聊天表情
 * createTime int 创建时间
 * massegeStatus int 是否被查看 :1否，2是
 * @param db
 * @param data
 */
function insertTalkingMessage(db,data) {
    newTalkingMessage(db)
    db.executeSql({
        name: 'mylocaldb',
        sql: 'INSERT INTO talkingMessage(id,uid,roomType,content,video,photo,yuyin,biaoqing,createTime,massegeStatus)  VALUES ( '+data.id+','+data.uid+', '+data.roomType+', "'+data.content+'", "'+data.video+'" , "'+data.photo+'", "'+data.yuyin+'","'+data.biaoqing+'" ,'+data.createTime+','+data.massegeStatus+')'
    }, function(ret, err){
        if( ret.status ){
            console.log('添加成功');
        }else{
            console.log("inserterr" + JSON.stringify( err ) );
        }
    });
}

/**
 * 根据id 查询一条信息
 * @param db
 * @param id
 */
function findTalkingMessageByid(db,id) {
    db.selectSql({
        name: 'mylocaldb',
        sql: 'SELECT * FROM talkingMessage where id='+id
    }, function(ret, err){
        if( ret.status ){
           return ret.data
        }else {
            console.log("selecterr" + JSON.stringify( err ) );
        }
    });
}


/**
 * 根据id 和创建时间删除一条信息
 * @param db
 * @param data
 */

function deleteTalkingMessageByid(db,data) {
        db.executeSql({
        name: 'mylocaldb',
        sql: 'delete from  talkingMessage where id='+data.id+'and createTime='+data.createTime
    }, function(ret, err){
        if( ret.status ){
            console.log('删除成功');
        }else{
            console.log("inserterr" + JSON.stringify( err ) );
        }
    });

}

/**
 * 获取所有的信息
 * @param db
 */
function getAlltalkingMessage(db) {
    newTalkingMessage(db)
    db.selectSql({
        name: 'mylocaldb',
        sql: 'SELECT * FROM talkingMessage'
    }, function(ret, err){
        if( ret.status ){
            console.log("selectall" + JSON.stringify( ret.data ) );
            return ret.data
        }else {
            console.log("selecterr" + JSON.stringify( err ) );
        }
    });
}

