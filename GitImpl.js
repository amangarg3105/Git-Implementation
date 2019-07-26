
function Commit (id, next, name) {
  this.id = id;
  this.next = next;
  this.name = name;
}

function Branch(name, commit) {
  this.name = name;
  this.commit = commit;
}

function Git() {

var commitId = -1;

var master = new Branch('master', null);
var HEAD = master;

var commits = [];
var branches = [];
branches.push(master);
  return {
    commit : function (message) {
      var commit = new Commit(++commitId, head, message);
      HEAD.commit = commit;
      commits.push(head);
      return commit;
    },
    log: function() {
      for(var i = 0; i < commits.length; i++) {
        log(commits[i].id + "  " + commits[i].name);
      }
    },

    checkout: function(branchName) {
      for(var index = branches.length; index > 0; index--) {
           if(branches[i].name === branchName) {
             console.log("Switched to new Branch that is " ,branchName);
             HEAD = branches[i];
             return;
           }
      }
      var newBranch = new Branch(branchName, HEAD.commit);
      console.log("Switched to new Branch that is " ,newBranch);
      branches.push(newBranch);
      HEAD = newBranch;
      return;
    },
    reset: function() {

    },
    revert: function() {

    },
    diff: function(commitId1 , commitId2) {

    },
    merge: function() {

    }

  }
}


var git = new Git();
git.commit()

git.commit()
git.checkout("BranchName");
