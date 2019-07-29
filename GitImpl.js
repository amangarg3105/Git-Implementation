
function Commit (id, branchname, name) {
  this.id = id;
  this.branchname = branchname;
  this.name = name;
}

function Branch(name, commit) {
  this.name = name;
  this.commit = commit;
}

function Git() {

var commitId = 0;

var master = new Branch('master', null);
var HEAD = master;

var commits = [];
var branches = [];
branches.push(HEAD);
  return {
    commit : function (message) {
      var commit = new Commit(commitId, HEAD.name, message);
      commitId++;
      HEAD.commit = commit;
      // console.log("commit func: "+HEAD.commit.name+"  "+HEAD.commit.id);
      commits.push(HEAD.commit);
      return commit;
    },

    log: function() {
      var id = [];
      var msg = [];
      var brnch = [];
      for(var i = 0; i < commits.length; i++) {
        id[i] = commits[i].id;
        msg[i] = commits[i].name;
        brnch[i] = commits[i].branchname;
        console.log("ID: " + commits[i].id + "   Message: " + commits[i].name);
      }
      return {id, msg, brnch, HEAD};
    },

    checkout: function(branchName) {
      for(var i = branches.length-1; i >= 0; i--) {
        // console.log("branch: " + branches[i]);
           if(branches[i].name === branchName) {
             console.log("Switched to Branch " ,branchName);
             var temp = "Switched to Branch " + branchName;
             HEAD = branches[i];
             return temp;
           }
      }
      var newBranch = new Branch(branchName, HEAD.commit);
      console.log("Switched to new Branch that is" ,newBranch.name);
      branches.push(newBranch);
      HEAD = newBranch;
      var temp = "Switched to new Branch that is " + newBranch.name;
      return temp;
    },
    
    revert: function(message) {
      var temp = "Revert commit: "+message;
      git.commit(temp);
    },
    
    merge: function(branchName) {
      for(var i = branches.length-1; i >= 0; i--) {
           if(branches[i].name === branchName) {
             var tempBranch =  branches[i];
             var pos = i;
           }
      }
      
      for(var i=0; i<commits.length; i++){
        if(commits[i].branchname===branchName){
          commits[i].branchname = HEAD.name;
        }
      }
      HEAD.commit = tempBranch.commit;
      branches.slice(i, i+1);
      return HEAD.name;
    }

  }
}





var git = new Git();

function commitbtn(commitMsg){
  git.commit(commitMsg.value);
  commitMsg.value = "";
  logbtn();
  document.getElementById("specialMessage").innerHTML = "";
}

function logbtn(){
  var commitobj = git.log();
  var display = document.getElementById("display");
  display.innerHTML = "";
  // var temp = "<div>" + "</b>Commit ID: <b>" + commitobj.id[commitobj.id.length-1] + "</b>     Message: <b>" + commitobj.msg[commitobj.id.length-1] + "<i>     HEAD -> "+commitobj.brnch[commitobj.id.length-1]+"</i></b></div";
  var temp = "<div>" + "</b>Commit ID: <b>" + commitobj.id[commitobj.HEAD.commit.id] + "</b>     Message: <b>" + commitobj.msg[commitobj.HEAD.commit.id] + "<i>     HEAD -> "+commitobj.brnch[commitobj.HEAD.commit.id]+"</i></b></div";
  display.innerHTML += temp;
  for(var i=commitobj.HEAD.commit.id-1;i>=0; i--){
    
    var temp = "<div>Commit ID: <b>" + commitobj.id[i] + "</b>     Message: <b>" + commitobj.msg[i] + "</b></div";
    display.innerHTML += temp;
  }
}

function checkoutbtn(commitMsg){
  var temp = git.checkout(commitMsg.value);
  commitMsg.value = "";
  document.getElementById("specialMessage").innerHTML = temp;
  logbtn();
}

function revertbtn(message){
  git.revert(message.value);
  message.value = "";
  logbtn();
}

function mergebtn(message){
  var head = git.merge(message.value);
  var temp = message.value + " has been merged with "+ head;
  document.getElementById("specialMessage").innerHTML = temp;
  message.value = "";
  logbtn();
}